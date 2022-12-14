import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Router from "next/router";
import { FaArrowCircleRight } from "react-icons/fa";

export default function Home() {
  const [collectionList, setCollectionList] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/collection")
      .then(function (response) {
        // handle success
        console.log(response);
        setCollectionList(response.data.results);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  console.log(collectionList);

  return (
    <div>
      <Head>
        <title>Balofy</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.homeWrapper}>
        <button
          className={styles.buttonCollection}
          onClick={() => {
            Router.push("/bolafy/my-collection");
          }}
        >
          See your collection
        </button>

        <main className={styles.main}>
          {collectionList.length !== 0 &&
            collectionList.map((data, index) => {
              return (
                <div
                  className={styles.cardCollection}
                  onClick={() => {
                    Router.push("/bolafy/collection-detail");
                  }}
                >
                  <div className={styles.container}>
                    <h4>
                      <b>{data.collection_name}</b>
                    </h4>
                    <div className={styles.cardDescription}>
                      <p>See collection's card</p>
                      <span className={styles.arrowRight}>
                        <FaArrowCircleRight />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </main>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
