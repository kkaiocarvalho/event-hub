import {
  Box,
  Center,
  FlatList,
  RefreshControl,
  Spinner,
  Text,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type InfiniteScrollProps = {
  hasNextPage: boolean;
  isLoading: boolean;
  isRefreshLoading: boolean;
  onRefresh: () => void;
  loadMoreEvents: () => void;
} & ComponentProps<typeof FlatList>;

export function InfiniteScroll(props: InfiniteScrollProps) {
  const {
    data,
    keyExtractor,
    renderItem,
    onRefresh,
    loadMoreEvents,
    isLoading,
    isRefreshLoading,
    hasNextPage,
  } = props;
  const dataWithLoading = !isRefreshLoading && isLoading ? [] : data;
  return (
    <FlatList
      data={dataWithLoading}
      keyExtractor={keyExtractor}
      extraData={dataWithLoading}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Box h="$5" />}
      ListEmptyComponent={
        <Center flex={1} pt="$2/3">
          <Text maxWidth="60%" textAlign="center" color="$textColor">
            {!isRefreshLoading && isLoading
              ? "Carregando conteúdo."
              : "Nenhum item encontrado até o momento :/"}
          </Text>
        </Center>
      }
      refreshControl={
        <RefreshControl
          colors={["#13F2F2"]}
          progressBackgroundColor="#111D40"
          refreshing={isRefreshLoading}
          onRefresh={onRefresh}
        />
      }
      onEndReached={hasNextPage ? loadMoreEvents : undefined}
      onEndReachedThreshold={0.8}
      ListFooterComponent={
        <>
          {isLoading ? (
            <Box py="$5">
              <Spinner size={45} />
            </Box>
          ) : null}
        </>
      }
    />
  );
}
