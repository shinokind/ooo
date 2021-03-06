import Link from 'next/link';
import Image from 'next/image';
import LayoutDefault from 'components/layout/LayoutDefault';
import { getMenuData, getAllPostSlugs, getPost } from 'lib/api';
import uniqid from 'uniqid';

export default function Index({ props }) {
  if (!props) {
    return <div>Loading...</div>;
  }
  return (
    <LayoutDefault title='Index' menuData={props.menusData}>
      <main className='main w-full'>
        <div className='inner px-8'>
          <h2 className='c-tail mb-8'>{props.postData.title.rendered}</h2>
          <div className='inner'>
            <div className='text-center pb-12'>
              <Image
                src={props.postData.thumb}
                width={500}
                height={350}
                loading={'lazy'}
                alt=''
                className='object-cover'
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: props.postData.content.rendered }}></div>
          </div>
        </div>
      </main>
    </LayoutDefault>
  );
}

export async function getStaticPaths() {
  const paths = await getAllPostSlugs('posts');

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  let props = {};
  props.menusData = await getMenuData();

  let query = {};
  query.slug = await params.slug;
  query.type = 'posts';
  //console.log(query);
  props.postData = await getPost(query);
 // console.log(props.postData); 
  return {
    props: {
      props,
    },
    revalidate: 5,
  };
}
