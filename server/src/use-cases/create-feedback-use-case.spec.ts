import { CreateFeedbackUseCase } from "./create-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const createFeedbackUseCase = new CreateFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Create feedback', () => {
  it('should be able to create a feedback', async () => {
    const exampleFeedbackData = {
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64example_screenshot',
    };

    await expect(
      createFeedbackUseCase.execute(exampleFeedbackData)
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledWith(exampleFeedbackData);

    expect(sendMailSpy).toHaveBeenCalledWith({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<p>Tipo do feedback: ${exampleFeedbackData.type}</p>`,
          `<p>Comentário: ${exampleFeedbackData.comment}</p>`,
        `</div>`,
      ].join('\n'),
    });
  });

  it('should no be able to create a feedback without type', async () => {
    await expect(createFeedbackUseCase.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64example_screenshot',
    })).rejects.toThrow('type is required');
  });

  it('should no be able to create a feedback without comment', async () => {
    await expect(createFeedbackUseCase.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64example_screenshot',
    })).rejects.toThrow('comment is required');
  });

  it('should no be able to create a feedback with an invalid screenshot', async () => {
    await expect(createFeedbackUseCase.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'invalid_screenshot',
    })).rejects.toThrow('Invalid screenshot format');
  });
});