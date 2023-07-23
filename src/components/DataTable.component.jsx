import React, { useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import ReactPaginate from "react-paginate";
import DataForm from "./DataForm.component";
import DataDialog from "./DataDialog.component";
import dataService from "../services/dataService";

const DataTable = ({ data, tableName }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [formMode, setFormMode] = useState("submit");

  const itemsPerPage = 5;
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentData = data.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleView = (e) => {
    setFormMode("view");
    setSelectedData(e);
    setShowForm(true);
  };
  const handleUpdate = (e) => {
    setFormMode("edit");
    setSelectedData(e);
    setShowForm(true);
  };

  const handleDelete = async (e) => {
    await dataService.deleteData(e);
    setShowSuccessDialog(true);
  };

  const handleAdd = () => {
    setFormMode("submit");
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4 mt-2">
        <h4 className="text-2xl">{tableName}</h4>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 focus:outline-none rounded-md text-white"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add
        </button>
      </div>

      {showForm && (
        <DataForm
          isOpen={showForm}
          onCancel={handleFormCancel}
          onClose={() => {
            setShowForm(false);
            setSelectedData(null);
          }}
          selectedData={selectedData}
          mode={formMode}
        />
      )}

      {showSuccessDialog && (
        <DataDialog
          onClose={() => setShowSuccessDialog(false)}
          Title="Data deleted successfully!"
        />
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="table-container w-full">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Body</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="py-3 px-6 text-left">{item.title}</td>
                  <td className="py-3 px-6 text-left">{item.body}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <button
                      onClick={() => handleView(item)}
                      className="mr-2 text-indigo-600 hover:text-indigo-900"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleUpdate(item)}
                      className="mr-2 text-yellow-600 hover:text-yellow-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <div className="pagination flex">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination flex"}
            activeClassName={"active"}
            pageLinkClassName={
              "block rounded-full bg-white text-indigo-600 hover:text-indigo-900 py-2 px-3 mx-1"
            }
            previousLinkClassName={
              "block rounded-full bg-white text-indigo-600 hover:text-indigo-900 py-2 px-3 mx-1"
            }
            nextLinkClassName={
              "block rounded-full bg-white text-indigo-600 hover:text-indigo-900 py-2 px-3 mx-1"
            }
            breakLinkClassName={
              "block rounded-full bg-white text-indigo-600 hover:text-indigo-900 py-2 px-3 mx-1"
            }
            activeLinkClassName={
              "block rounded-full bg-indigo-600 text-black py-2 px-3 mx-1"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
