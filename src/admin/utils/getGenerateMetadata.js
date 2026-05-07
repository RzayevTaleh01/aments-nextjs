import Head from "next/head";

export default function GetGenerateMetadata({meta}) {
    return (
        <Head>
            <title>{meta.title}</title>
            <meta name="description" content={meta.description} />
        </Head>
    )
}