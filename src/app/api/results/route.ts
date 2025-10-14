import { NextResponse } from 'next/server';

// This is the same in-memory cache from the other file.
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

  // If the job is complete, we can remove it from the cache to save memory.
  if (job.status === 'completed' || job.status === 'failed') {
    jobCache.delete(jobId);
  }

  return NextResponse.json(job);
}