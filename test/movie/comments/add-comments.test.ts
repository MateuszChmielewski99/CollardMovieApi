import 'reflect-metadata';
import dotenv from 'dotenv';
import { describe, Done, before } from 'mocha';
import { bootstrap } from '../../../src/container-setup';
import { IValidator } from '../../../src/validators/IValidator';
import { AddCommentRequest } from 'collard_movies_model';
import { container } from 'tsyringe';
import {assert, expect} from 'chai'

before(() => {
  dotenv.config();
  bootstrap();
});

describe('Add new comment', () => {
  it('should fail for comment with empty body', async () => {
    //given
    const validator: IValidator<AddCommentRequest> = container.resolve(
      'IValidator<AddCommentRequest>'
    );

    const request: AddCommentRequest = {
      comment: {
        author: {
          id: '',
          name: '',
        },
        body: '',
        creationDate: '',
        id: '',
      },
      movieId: '1231',
    };

    //when
    const validationResult = await validator.validate(request);
    console.log(validationResult);
    
    //then
    expect(validationResult.result).to.be.equal(false);
    expect(validationResult.reason).not.to.equal('');
  });
});
