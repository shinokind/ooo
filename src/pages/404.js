import LayoutBlank from 'components/layout/LayoutBlank';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <LayoutBlank title='ページが見つかりませんでした'>
        <div className='404'>
          <div className='inner h-64 w-full flex justify-center items-center flex-col text-gray-500'>
            <span className='inline-block text-4xl font-bold py-12'>404 page not found...</span>
            <Link href='/'>
              <a class='inline-block c-hover-action font-bold flex flex-col items-center justify-center'>
                <svg
                  class='alert'
                  width='80'
                  height='80'
                  viewBox='0 0 80 80'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M68 40C68 55.464 55.464 68 40 68C24.536 68 12 55.464 12 40C12 24.536 24.536 12 40 12C55.464 12 68 24.536 68 40ZM39.9678 21.5C41.3485 21.5 42.4678 22.6193 42.4678 24V46.4C42.4678 47.7807 41.3485 48.9 39.9678 48.9C38.5871 48.9 37.4678 47.7807 37.4678 46.4V24C37.4678 22.6193 38.5871 21.5 39.9678 21.5ZM42.4678 53.5999C42.4678 52.2192 41.3485 51.0999 39.9678 51.0999C38.5871 51.0999 37.4678 52.2192 37.4678 53.5999V55.1999C37.4678 56.5806 38.5871 57.6999 39.9678 57.6999C41.3485 57.6999 42.4678 56.5806 42.4678 55.1999V53.5999Z'
                    fill='#718096'
                  />
                </svg>
                <span class='inline-block'>Back to Top</span>
              </a>
            </Link>
          </div>
        </div>
      </LayoutBlank>
    </>
  );
}
