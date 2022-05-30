import fetch from 'node-fetch';

// ==================================================
// getMenuData
// ==================================================
export async function getMenuData() {
  const res = await fetch(new URL('https:/coffee-station.hariocorp.co.jp/wp-json/wp-api-menus/v2/menus/8'));
  const res2 = await res.json();
  const tmpMenuData = res2.items;
  const tmpCatData = await getCatData(); // menuにはslugがないのでカテゴリデータのslugを結合
console.log(tmpCatData);
  // --------------------------------------------------
  // ディレクトリ名とスラッグを結合
  // --------------------------------------------------
  let tmpMenuDataEdit = [];
  for (const n of tmpMenuData) {
    // カテゴリーの場合
    if (n.object === 'category') {
      n.dir = 'category';
      for (const nn of tmpCatData) {
        if (n.object_id === nn.id) {
          n.slug = nn.slug;
        }
      }
    }
    // 固定ページの場合
    else if (n.object === 'page') {
      n.dir = 'page';
      n.slug = n.object_slug;
    }
    // CPTの場合
    else {
      n.dir = 'cpt';
      n.slug = n.object_slug;
    }

    tmpMenuDataEdit.push(n);
  }
  return tmpMenuDataEdit;
}

// ==================================================
// getAllPosts
// ==================================================
export async function getAllPosts(query) {
  // console.log(query);
  let tmpPosts = [];
  let i = 1;

  const newQuery = `
  https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/${query.type ? query.type : 'posts'}?_embed&per_page=${
    query.per_page ? query.per_page : process.env.PER_PAGES
  }&page=${query.page ? query.page : i}&categories_exclude=1&search=${
    query.search ? query.search : ''
  }${query.categories ? '&categories=' + query.categories : []}
    ${query.tags ? '&tags=' + query.tags : []}
    `;

  // console.log(newQuery);
  const res = await fetch(new URL(newQuery));
  tmpPosts = await res.json();
 // console.log(newQuery);
  return tmpPosts;
}

// ==================================================
// getAllPostSlugs
// ==================================================
export async function getAllPostSlugs(type = 'posts') {
  let slugs = [];
  // console.log(type);
  const i = 1;
  // for (let i = 1; i < 12; i++) {
  // const element = array[index];
  const res = await fetch(
    new URL(`https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/${type}?per_page=100&page=${i}&_embed=1`)
  );
  const tmp = await res.json();

  for (let n of tmp) {
    if (n.title.rendered.indexOf('page-dir') === -1) {
      // タイトルにpage-dirが入るものは除く
      slugs.push(n.slug);
    }
  }
  // }

  return slugs.map((slug) => {
    return {
      params: {
        slug: String(slug),
      },
    };
  });
}

// ==================================================
// getPost
// ==================================================
export async function getPost(query) {
   //console.log(query);
  const res = await fetch(
    new URL(
 //     `https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/posts/?_embed&slug=${query.slug}`
     `https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/${query.type ? query.type : 'posts'}/?_embed&slug=${query.slug}`
    // `https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/posts/?${query.slug}_embed`
    // 'https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/posts/?12941&_embed'
    )
  );
  const tmp = await res.json();
  //console.log(tmp);
  const tmpPost = tmp[0];

 // console.log(tmpPost);
 let tmpPhoto = '';
 //if (tmpPost._embedded['wp:featuredmedia'][0]) {
 //  tmpPhoto = tmpPost._embedded['wp:featuredmedia'][0].source_url;
 //} else {
tmpPhoto = 'https:/coffee-station.hariocorp.co.jp/wp-content/uploads/2020/11/logo_3.png';
 // }
tmpPost.thumb = tmpPhoto;
 // console.log(tmpPost);
  return tmpPost;
}

// ==================================================
// getAllCatSlugs
// ==================================================
export async function getAllCatSlugs() {
  const res = await fetch(new URL(`https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/categories?_embed&per_page=100`));
  const tmp = await res.json();
  // console.log(tmp);

  let tmpCatSlugs = [];
  for (let n of tmp) {
    tmpCatSlugs.push(n.slug);
  }
  // console.log(tmpCatSlugs);

  return tmpCatSlugs.map((slug) => {
    // console.log(slug);
    return {
      params: {
        category: String(slug),
      },
    };
  });
}

// ==================================================
// getCatData
// ==================================================
export async function getCatData(slug = '') {
   //console.log(slug);
const res = await fetch(new URL(`https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/categories?per_page=100&page=1&_embed&slug=${slug}`));
// const regex = RegExp(/^[+,-]?([1-9]\d*|0)$/);
// if(regex.test(slug)){
 //const res = await fetch(new URL(`https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/categories/${slug}?_embed`));
  //  }else{
   //   const res = await fetch(new URL(`https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/categories?_embed&slug=${slug}`));
   // }
 //   console.log(tmpCatData.name);
  const tmp = await res.json();
  // console.log(tmp);
// const tmpCatData = tmp[0];
 //console.log(tmpCatData.name);

  return tmp;
}

// ==================================================
// getAllTagSlugs
// ==================================================
export async function getAllTagSlugs() {
  const res = await fetch(new URL(`https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/tags?_embed&per_page=100`));
  const tmp = await res.json();

  let tags = [];
  for (let n of tmp) {
    tags.push(n.slug);
  }
  return tags.map((tag) => {
    return {
      params: {
        tag: String(tag),
      },
    };
  });
}

// ==================================================
// getTagData
// ==================================================
export async function getTagData(slug = '') {
  // console.log('tag');
  // console.log(slug);
  const res = await fetch(
    new URL(`https:/coffee-station.hariocorp.co.jp/wp-json/wp/v2/tags?_embed&slug=${slug}&per_page=100`)
  );
  const tmp = await res.json();
  return tmp;
}
