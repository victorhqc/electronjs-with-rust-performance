import { getConnection } from 'typeorm';
import { ImdbMovie } from '../../entity/ImdbMovie';

export async function getMoviesTotal() {
  const conn = getConnection();
  const total = await conn.getRepository(ImdbMovie).createQueryBuilder('total').getCount();

  return total;
}
