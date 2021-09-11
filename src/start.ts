const start = async () => {
  try {
    if (!process.env.PORT) {
      throw Error('PORT must be defined.');
    }

    if (!process.env.NODE_ENV) {
      throw Error('NODE_ENV must be defined.');
    }

    const app = (await import('./app')).default;

    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
