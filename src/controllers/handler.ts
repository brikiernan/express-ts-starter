import { Request, Response } from 'express';

export const handler = async (req: Request, res: Response) => {
  const {} = req;

  try {
    await new Promise(resolve => setTimeout(resolve, 800));

    res.status(200).send({ hey: 'now!' });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
