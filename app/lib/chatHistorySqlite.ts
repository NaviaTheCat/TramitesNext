import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import path from 'node:path'

type ChatRole = 'usuario' | 'asistente'

type ChatRow = {
    id: number
    session_id: string
    role: ChatRole
    content: string
    created_at: string
}

const dataDir = path.join(process.cwd(), 'data')
const dbPath = path.join(dataDir, 'chat-history.db')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore -- En este setup el default import de better-sqlite3 se resuelve como namespace para tipos.
let db: Database | null = null

function getDb() {
    if (db) {
        return db
    }

    mkdirSync(dataDir, { recursive: true })
    db = new Database(dbPath)

    db.exec(`
    CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('usuario', 'asistente')),
      content TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_chat_messages_session_created
      ON chat_messages (session_id, created_at, id);
  `)

    return db
}

export function saveMessage(sessionId: string, role: ChatRole, content: string) {
    const normalized = content.trim()
    if (!normalized) {
        return
    }

    const sqlite = getDb()
    const stmt = sqlite.prepare(
        'INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)'
    )

    stmt.run(sessionId, role, normalized)
}

export function saveConversationTurn(
    sessionId: string,
    question: string,
    answer: string
) {
    const sqlite = getDb()

    const transaction = sqlite.transaction(
        (currentSessionId: string, currentQuestion: string, currentAnswer: string) => {
            saveMessage(currentSessionId, 'usuario', currentQuestion)
            saveMessage(currentSessionId, 'asistente', currentAnswer)
        }
    )

    transaction(sessionId, question, answer)
}

export function getSessionMessages(sessionId: string) {
    const sqlite = getDb()

    const rows = sqlite
        .prepare(
            `SELECT id, session_id, role, content, created_at
       FROM chat_messages
       WHERE session_id = ?
       ORDER BY created_at ASC, id ASC`
        )
        .all(sessionId) as ChatRow[]

    return rows.map((row) => ({
        id: row.id,
        tipo: row.role,
        texto: row.content,
        fecha: row.created_at,
    }))
}
