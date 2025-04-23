import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the request body
    const body = await request.json();
    
    const webhookUrl = "https://script.google.com/macros/s/AKfycbztwh1iT22I4u0XTcrzZE4ZIVft2tt9wBWkf9ry2klwGvCut2LH-zrVroVQUDTL46OB/exec";

    // Forward the request to Google Apps Script
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script responded with ${response.status}`);
    }

    // Return success response
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error('Error forwarding to webhook:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
} 