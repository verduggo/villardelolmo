import { NextRequest, NextResponse } from 'next/server'
import { enviarMensajeContacto } from '@/lib/supabase/contacto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { nombre, email, telefono, asunto, mensaje } = body
    
    // Validación básica
    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email no válido' },
        { status: 400 }
      )
    }
    
    const mensajeGuardado = await enviarMensajeContacto({
      nombre,
      email,
      telefono: telefono || null,
      asunto,
      mensaje,
    })
    
    return NextResponse.json(
      { success: true, data: mensajeGuardado },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al enviar mensaje:', error)
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    )
  }
}
