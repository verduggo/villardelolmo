import { NextRequest, NextResponse } from 'next/server'
import { getEquipos, getEquiposByTemporada } from '@/lib/supabase/equipos'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const temporada = searchParams.get('temporada')
    
    let equipos
    
    if (temporada) {
      equipos = await getEquiposByTemporada(temporada)
    } else {
      equipos = await getEquipos()
    }
    
    return NextResponse.json({ data: equipos })
  } catch (error) {
    console.error('Error al obtener equipos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los equipos' },
      { status: 500 }
    )
  }
}
