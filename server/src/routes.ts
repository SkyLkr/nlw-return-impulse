import { Router } from 'express';

import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

import { CreateFeedbackUseCase } from './use-cases/create-feedback-use-case';

const routes = Router();

routes.post('/feedbacks', async (req, res) => {
  const {
    type,
    comment,
    screenshot,
  } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const createFeedbackUseCase = new CreateFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter,
  );

  await createFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
})

export default routes;