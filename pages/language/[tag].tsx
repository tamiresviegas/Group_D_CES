import Head from "next/head";

import data from "../../generated.json";
import { RepositoryList } from "../../components/RepositoryList";
import { CountableTag, Repository } from "../../types";


export default function Language(
   {repositories,
    tag,
    languages} : 
   {
    repositories: Repository[];
    tag: string,
    languages: CountableTag[];
  }
) {
  
  const language = languages.find((language) => language.id == tag);
  const pageTitle = `First Issue | ${language?.display} Language`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <RepositoryList
        repositories={repositories.filter((repository) => repository.language.id == tag)}
      />
    </>
  );
}

export async function getStaticPaths(){
  return {
    paths: [
      {
        params: { tag: 'go' },
      },
      {
        params: { tag: 'java' },
      },
      {
        params: { tag: 'javascript' },
      },
      {
        params: { tag: 'python' },
      },
    ],
    fallback: false,
  }
}

// Tag:languages id on the enpoint. Repposiroties and Lnaguages come from _app
export async function getStaticProps(context: any){
    const { tag } = context.params;
    return {
      props: {repositories: data.repositories, languages: data.languages, topics: data.topics, tag }
    };
}