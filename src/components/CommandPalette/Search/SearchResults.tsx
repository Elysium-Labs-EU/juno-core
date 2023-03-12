import CustomButton from 'components/Elements/Buttons/CustomButton'
import LoadingState from 'components/Elements/LoadingState/LoadingState'
import ThreadList from 'components/EmailList/ThreadList'
import * as global from 'constants/globalConstants'
import { Paragraph } from 'styles/globalStyles'

import * as S from '../CommandPaletteStyles'
import type { ICommandPalletteSearchResults } from '../CommandPaletteTypes'

const SearchResults = ({
  focusedItemIndex,
  handleOpenEmailEvent,
  loadMoreSearchResults,
  loadState,
  searchResults,
  setFocusedItemIndex,
}: ICommandPalletteSearchResults) => (
  <>
    {searchResults?.threads ? (
      <ThreadList
        focusedItemIndex={focusedItemIndex}
        keySuffix="search"
        searchOnClickHandeler={handleOpenEmailEvent}
        setFocusedItemIndex={setFocusedItemIndex}
        showCheckbox={false}
        showLabel
        threads={searchResults.threads}
      />
    ) : null}
    {searchResults?.nextPageToken ? (
      <S.FooterRow>
        {loadState !== global.LOAD_STATE_MAP.loading && (
          <CustomButton
            onClick={() => loadMoreSearchResults()}
            label={global.LOAD_MORE}
            suppressed
            title="Load more results"
          />
        )}
        {loadState === global.LOAD_STATE_MAP.loading && <LoadingState />}
      </S.FooterRow>
    ) : (
      <S.FooterRow>
        <Paragraph small muted>
          {global.NO_MORE_RESULTS}
        </Paragraph>
      </S.FooterRow>
    )}
  </>
)

export default SearchResults
