import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { Repository } from "../types";
import { RepositoryItem } from "./RepositoryItem";

type RepositoryListProps = {
  repositories: Repository[];
};

const Loader = () => (
  <div className="p-4 w-full">
    <div className="flex items-center justify-center">
      <FontAwesomeIcon icon={faCircleNotch} className="fa-spin" />
    </div>
  </div>
);

export const RepositoryList = ({ repositories }: RepositoryListProps) => {
  const itemsPerScroll = 15;
  const [items, setItems] = useState(itemsPerScroll);

  return (
    <main>
      <div className="p-4 w-full">
        <InfiniteScroll
          dataLength={items}
          next={() => setItems(items + itemsPerScroll)}
          hasMore={items < repositories.length}
          loader={<Loader />}
        >
          {repositories.slice(0, items).map((repository) => (
            <RepositoryItem key={repository.id} repository={repository} />
          ))}
        </InfiniteScroll>
      </div>
    </main>
  );
};
