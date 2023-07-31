import {
  ClickData,
  EventManager,
  MonthYear,
  Page,
  Resource,
} from '@event-manager/react';
import { resources } from './assets/data';
import { TablePagination, TextField } from '@mui/material';
import { useMemo, useState } from 'react';

function App() {
  const [page, setPage] = useState<Page>({
    current: 0,
    size: 10,
    count: Math.ceil(resources.length / 10),
    total: resources.length,
  });
  const [data, setData] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);

  // This can be any async fetch function
  // This function is triggered my page change
  useMemo(() => {
    setLoading(true);
    setTimeout(() => {
      const data = resources.slice(
        page.current * page.size,
        (page.current + 1) * page.size
      );
      setData(data);
      setLoading(false);
    }, 500);
  }, [page]);

  const handleClick = (data: ClickData | undefined) => {
    console.log(data);
  };

  const handleUpdateDate = (date: MonthYear) => {
    console.log(date);
  };

  const handleSearch = (text: string) => {
    console.log(text);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage({ ...page, current: newPage });
  };
  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPage({ ...page, size: Number(e.target.value) });
  };

  return (
    <>
      <EventManager
        resources={data}
        tableId={2}
        showTooltip
        showLegend
        loading={loading}
        search={
          <TextField
            variant="standard"
            label="Search"
            onChange={(e) => handleSearch(e.target.value)}
          />
        }
        pagination={
          <TablePagination
            component="div"
            count={page.total}
            page={page.current}
            onPageChange={handleChangePage}
            rowsPerPage={page.count}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
        onClick={handleClick}
        onUpdateDate={handleUpdateDate}
      />
    </>
  );
}

export default App;
