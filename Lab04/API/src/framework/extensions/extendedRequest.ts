import { Request, Response, NextFunction } from 'express';

import { ICurrentUser } from 'framework/auth/models/currentUser.model';

export interface ExtendedRequest extends Request {
  currentUser: ICurrentUser;
}

export interface TypedExtendedRequest<T> extends ExtendedRequest {
  body: T;
}
export interface TypedRequest<T> extends Request {
  body: T;
}

export type ExtendedRequestHandler = (req: ExtendedRequest, res: Response, next: NextFunction) => Promise<void>;