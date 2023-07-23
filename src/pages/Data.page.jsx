import React, { useState, useEffect } from "react";
import Case from "../components/Case.component";
import DataTable from "../components/DataTable.component";
import dataService from "../services/dataService";

export default function Data() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await dataService.getData();
    if (result) {
      setData(result);
    }
  };
  return (
    <Case>
      <div className="w-full">
        {data.length > 0 ? (
          <DataTable data={data} tableName={"typicode"} />
        ) : (
          <p className="text-gray-600">Loading data...</p>
        )}
      </div>
    </Case>
  );
}
