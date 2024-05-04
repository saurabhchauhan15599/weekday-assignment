import { useInfiniteQuery } from "@tanstack/react-query";
import React, { RefObject, useState } from "react";
import { IData } from "../../helpers/types";
import { fetchJobInfo } from "../../service/fetchInfo.service";
import InfiniteScroll from "../InfiniteScroller";
import styles from "./Card.module.scss";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

interface IPageOptions {
  currentPage: number;
  hasNext: boolean;
}

interface ICard {
  ref: RefObject<HTMLElement>;
}

const Card: React.FC<ICard> = ({ ref }) => {
  const [pageOptions, setPageOptions] = useState<IPageOptions>({
    currentPage: 1,
    hasNext: true,
  });
  const { currentPage, hasNext } = pageOptions;
  const fetchData = async ({
    pageParam,
  }: {
    pageParam: number;
  }): Promise<{
    data: IData[];
    currentPage: number;
    nextPage: number;
  }> => {
    const payload = { offset: pageParam, limit: 10 };
    const response = await fetchJobInfo(JSON.stringify(payload));
    setPageOptions((prev) => ({
      ...prev,
      currentPage: pageParam,
      hasNext: response.totalCount > 0,
    }));
    return {
      data: response.jdList ?? [],
      currentPage: pageParam,
      nextPage: pageParam + 1,
    };
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["jobPosts"],
      queryFn: fetchData,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
    });

  return (
    <main className={styles.cardContainer}>
      <InfiniteScroll
        rootRef={ref?.current!}
        hasMore={hasNextPage || !isFetching}
        currentIndex={currentPage}
        onIntersect={() => fetchNextPage()}
      >
        {!error ? (
          data?.pages.map((page, i) => {
            return (
              <React.Fragment key={i}>
                {page.data.map((item) => {
                  return (
                    <div key={`card-${item.jdUid}`} className={styles.card}>
                      <CardHeader data={item} />
                      <CardBody data={item} />
                      <CardFooter data={item} />
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })
        ) : (
          <p>{error.message}</p>
        )}
      </InfiniteScroll>
    </main>
  );
};

export default Card;
