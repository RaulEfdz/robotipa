import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/app/actions';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const validatedData = contactFormSchema.parse(formData);

    // Here you would implement your email sending logic
    // For now, we'll just return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid form data' },
      { status: 400 }
    );
  }
}
