import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Book from '../models/Book';

class BookController {

  async index(request: Request, response: Response) {
    const repository = getRepository(Book);
    const books = await repository.find();

    books.map((book) => { delete book.owner.password });

    const newToken = request.newToken;
    if (newToken) {
      return response.json({ books, newToken });
    }

    return response.json(books);
  }

  async store(request: Request, response: Response) {
    const requesterUserId = request.userId;
    const repository = getRepository(Book);
    const { 
      title, 
      description, 
    } = request.body;

    const book = repository.create({
      title,
      description,
      owner: { id: requesterUserId }
    });

    await repository.save(book);

    const newToken = request.newToken;
    if (newToken) {
      return response.json({ book, newToken });
    }

    return response.json(book);
  }
  
}

export default new BookController();