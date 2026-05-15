import { NextRequest, NextResponse } from 'next/server'
import { crearInscripcion } from '@/lib/supabase/inscripciones'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { 
      tipo, 
      nombre, 
      apellidos, 
      email, 
      telefono, 
      fecha_nacimiento,
      dni,
      direccion,
      categoria_interes,
      notas 
    } = body
    
    // Validación básica
    if (!tipo || !nombre || !apellidos || !email) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }
    
    // Validar tipo
    if (!['socio', 'jugador'].includes(tipo)) {
      return NextResponse.json(
        { error: 'Tipo de inscripción no válido' },
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
    
    const inscripcion = await crearInscripcion({
      tipo,
      nombre,
      apellidos,
      email,
      telefono: telefono || null,
      fecha_nacimiento: fecha_nacimiento || null,
      dni: dni || null,
      direccion: direccion || null,
      categoria_interes: categoria_interes || null,
      notas: notas || null,
      estado: 'pendiente',
    })
    
    return NextResponse.json(
      { success: true, data: inscripcion },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error al crear inscripción:', error)
    return NextResponse.json(
      { error: 'Error al procesar la inscripción' },
      { status: 500 }
    )
  }
}
