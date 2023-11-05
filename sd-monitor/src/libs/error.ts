import type { FastifyError } from 'fastify'

export class AppError {
  constructor(public statusCode: number, public message: string) {}
}

export function isAppError(error: any) {
  return error instanceof AppError
}
