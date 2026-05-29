import { NextRequest, NextResponse } from 'next/server'
import { getProximosPartidos, getUltimosResultados, getPartidosByEquipo } from '@/lib/supabase/partidos'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get('tipo')
    const equipoId = searchParams.get('equipo')
    const limit = searchParams.get('limit')
    
    let partidos
    
    if (equipoId) {
      partidos = await getPartidosByEquipo(equipoId)
    } else if (tipo === 'proximos') {
      partidos = await getProximosPartidos(limit ? parseInt(limit) : 5)
    } else if (tipo === 'resultados') {
      partidos = await getUltimosResultados(limit ? parseInt(limit) : 5)
    } else {
      // Por defecto, devolver próximos partidos
      partidos = await getProximosPartidos(limit ? parseInt(limit) : 5)
    }
    
    return NextResponse.json({ data: partidos })
  } catch (error) {
    console.error('Error al obtener partidos:', error)
    return NextResponse.json(
      { error: 'Error al obtener los partidos' },
      { status: 500 }
    )
  }
}
