import { NextResponse } from 'next/server';
import terms from '@/data/terms.json';

export async function GET() {
  return NextResponse.json(terms);
}
