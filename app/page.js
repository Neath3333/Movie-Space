import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import MovieCard from '../components/MovieCard';


export default function Home() {

return (
    <div className='bg-blue-900'>
   <MovieCard  />
    </div>
  );
}
