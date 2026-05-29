import { NextRequest, NextResponse } from 'next/server'
import { getNoticias, getNoticiasDestacadas } from '@/lib/supabase/noticias'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const destacadas = searchParams.get('destacadas')
    
    let noticias
    
    if (destacadas === 'true') {
      noticias = await getNoticiasDestacadas(limit ? parseInt(limit) : 3)
    } else {
      noticias = await getNoticias(limit ? parseInt(limit) : undefined)
    }
    
    return NextResponse.json({ data: noticias })
  } catch (error) {
    console.error('Error al obtener noticias:', error)
    return NextResponse.json(
      { error: 'Error al obtener las noticias' },
      { status: 500 }
    )
  }
}
