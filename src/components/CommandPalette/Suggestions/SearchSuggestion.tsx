import * as S from './SuggestionStyles'

const label = 'Search for'

export default function SearchSuggestion({
  searchValue,
}: {
  searchValue: string | undefined
}) {
  return (
    <S.SearchSpan>
      {label}
      <S.SearchContentOverflow>
        &quot;{searchValue}&quot;
      </S.SearchContentOverflow>
    </S.SearchSpan>
  )
}
