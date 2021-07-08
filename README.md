# Gregs Records

Live Link: https://gregs-records.vercel.app/

## Getting Started

To start locally, simply run:

```
cd gregs-records
yarn start
```
## Pattens Implemented

### Reducer Pattern

This application uses [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) as the state management tool of choice.

The application to me didn't feel of the size & scale to use something like Redux -- maybe if it were a part of
a larger application.

All state related logic (reducer, types, actions) can be found in `src/state`

### Custom Hooks

The application makes use of custom hooks to modularize pieces of logic for easy reuse.

For example, I've found that when doing common tasks like searching, custom hooks can be a great way to decouple logic from interface.

Example:

```jsx
// Component1.tsx
const { searchValue, handleSearchChange } =
  useBasicSearch();
<RegularSearchBar value={searchValue} handleChange={handleSearchChange} />

// Component2.tsx
const { searchValue, handleSearchChange, handleSearchClear } =
  useBasicSearch();

<ClearableSearchBar value={searchValue} handleChange={handleSearchChange} handleClear={handleSearchClear} />
```

These hooks can be found in `src/hooks`

### Component Composition

This application makes use of [Component Composition](https://reactjs.org/docs/composition-vs-inheritance.html)

For example, the `RecordList` is a series of composed reusable components:

```tsx static
<RecordList>
    <RecordListHeader />
    <RecordListContent loading={loading}>
      <RecordListHeadingRow
        titles={["Title", "Year", "Condition", "Artist Name"]}
      />
      {recordData.map((record: Record) => (
        <RecordListItem
          record={record}
        />
      ))}
    </RecordListContent>
    <RecordListFooter>
      <Pagination
        currentPage={currentPage}
        handlePageUp={pageUp}
        handlePageDown={pageDown}
        handleJumpToPage={jumpToPage}
        allPages={allPages}
      />
    </RecordListFooter>
</RecordList>
```

> **_Improvements:_** To be truly composable, the styles also have to be configurable and a property. I didn't have time to implement this unfortunately.
