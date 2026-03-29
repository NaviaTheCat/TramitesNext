import { NextResponse } from 'next/server'
import { getSessionMessages, saveConversationTurn } from '@/app/lib/chatHistorySqlite'

export const runtime = 'nodejs'

type AskResponse = {
    answer?: string
    respuesta?: string
}

type RagCallResult = {
    payload: AskResponse
    endpoint: string
}

function normalizeAnswer(data: AskResponse) {
    if (typeof data?.respuesta === 'string' && data.respuesta.trim()) {
        return data.respuesta.trim()
    }

    if (typeof data?.answer === 'string' && data.answer.trim()) {
        return data.answer.trim()
    }

    return 'No se obtuvo una respuesta valida del asistente.'
}

function getRagEndpoints() {
    const raw = process.env.RAG_API_URL

    if (raw?.trim()) {
        return raw
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
    }

    return ['http://127.0.0.1:8000/ask', 'http://127.0.0.1:8000/chat']
}

async function callRag(question: string): Promise<RagCallResult> {
    const endpoints = getRagEndpoints()
    let lastError: unknown = null

    for (const endpoint of endpoints) {
        try {
            const ragResponse = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question }),
                signal: AbortSignal.timeout(12_000),
            })

            if (!ragResponse.ok) {
                throw new Error(`Error HTTP ${ragResponse.status} en ${endpoint}`)
            }

            const payload = (await ragResponse.json()) as AskResponse
            return { payload, endpoint }
        } catch (error) {
            lastError = error
        }
    }

    throw lastError instanceof Error
        ? lastError
        : new Error('No fue posible conectar a ningun endpoint RAG configurado')
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')?.trim()

    if (!sessionId) {
        return NextResponse.json(
            { error: 'sessionId es requerido' },
            { status: 400 }
        )
    }

    const messages = getSessionMessages(sessionId)
    return NextResponse.json({ messages })
}

export async function POST(request: Request) {
    let body: { question?: string; sessionId?: string }

    try {
        body = await request.json()
    } catch {
        return NextResponse.json({ error: 'JSON invalido' }, { status: 400 })
    }

    const question = body.question?.trim()
    const sessionId = body.sessionId?.trim()

    if (!question) {
        return NextResponse.json({ error: 'question es requerido' }, { status: 400 })
    }

    if (!sessionId) {
        return NextResponse.json({ error: 'sessionId es requerido' }, { status: 400 })
    }

    try {
        const ragResult = await callRag(question)
        const answer = normalizeAnswer(ragResult.payload)

        try {
            saveConversationTurn(sessionId, question, answer)
        } catch (dbError) {
            console.error('No se pudo guardar historial (respuesta exitosa):', dbError)
        }

        return NextResponse.json({ answer, endpoint: ragResult.endpoint })
    } catch (error) {
        const answer =
            'Error al conectar con el servidor del asistente.' +
            (error instanceof Error ? ` ${error.message}` : '')

        try {
            saveConversationTurn(sessionId, question, answer)
        } catch (dbError) {
            console.error('No se pudo guardar historial (respuesta con error):', dbError)
        }

        return NextResponse.json(
            { answer, error: 'No fue posible consultar el RAG' },
            { status: 502 }
        )
    }
}
