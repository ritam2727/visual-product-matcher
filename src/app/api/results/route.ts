import { NextResponse } from 'next/server';

const jobCache = new Map();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('jobId');

  if (!jobId) {
    return NextResponse.json({ error: 'Job ID is required.' }, { status: 400 });
  }

  const job = jobCache.get(jobId);

  if (!job) {
    return NextResponse.json({ status: 'not_found' }, { status: 404 });
  }

  if (job.status === 'completed' || job.status === 'failed') {
    jobCache.delete(jobId);
  }

  return NextResponse.json(job);
}