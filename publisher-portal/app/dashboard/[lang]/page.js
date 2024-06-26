"use client"
import React, {useState, useEffect, useMemo, useRef} from "react";
import {
  useTable,
  useSortBy,

  useGlobalFilter,
} from "react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {BiChevronDown, BiChevronUp} from "react-icons/bi";
import { useUser } from "@clerk/nextjs";
import Header from "@/components/Header";
import Link from "next/link";
import { useLanguage } from '@/contexts/LanguageContext';


const Dashboard = (req,res) => {

  const { user } = useUser();
  const { language } = useLanguage();
  const [url,setUrl]=useState("");
  const [fullData, setFullData] = useState([]); // Store all the data
  const [visibleData, setVisibleData] = useState([]); // Data currently visible in the table
  const [profileData, setProfileData]=useState([]);
  const [hasMore, setHasMore] = useState(true); // Whether more data is available
  const PAGE_SIZE = 20;
  const tableRef = useRef(null);

  const fetchUserData = async () => {
    try {
      
      const response = await fetch(
        `https://pubserver.sanchaya.net/profile/${user.emailAddresses[0]}`
      );
      if (!response.ok) {
        console.log('User not found');
      }
      const responseData = await response.json();
      console.log(responseData);
   
     // Check if userProfile exists in responseData
     if (responseData) {
        const userProfileData = responseData.user;
        const publisherLogoData = responseData.userWithLogo;
        setProfileData(userProfileData);

        setUrl(publisherLogoData.logo);
        console.log(profileData);
    }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  
  useEffect(()=>{

    if(user){
        fetchUserData();
    }
},[user]);



  useEffect(()=>{

    if(user){
        fetchData();
    }
},[user]);


  const columns = useMemo(
    () => [
     
      {
        Header: "Title",
        accessor: "bookTitle",
      },
      {
        Header: "Author",
        accessor: "authorName",
      },
      {
        Header: "Pages",
        accessor: "pageCount",
      },
      
      {
        Header: "ISBN",
        accessor: "isbn",
      },
      
      {
        Header:"Volume",
        accessor:"volume"
      },
      {
        Header: "Edition",
        accessor: "edition",
      },
      {
        Header: "Series",
        accessor: "seriesName",
      },
      {
        Header: "Year",
        accessor: "publishedYear",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Genre",
        accessor: "subject",
      },
      {
        Header: "UploadedDate",
        accessor: "uploadedAt",
      },
    ],
    []
  );




  const fetchData = async () => {
    try {
     
      console.log('called');
      console.log(user);
      const response = await fetch(
        `https://pubserver.sanchaya.net/users/books/${user.emailAddresses[0]}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const fetchedData = await response.json();
   
      setFullData(fetchedData.books);
      setVisibleData(fetchedData.books.slice(0, PAGE_SIZE));
     
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const fetchMoreData = () => {
    const currentLength = visibleData.length;
    const nextData = fullData.slice(currentLength, currentLength + PAGE_SIZE);
    setVisibleData([...visibleData, ...nextData]);
    setHasMore(currentLength + PAGE_SIZE < fullData.length);
  };

  const filterByDates = (rows, columnIds, filterValue) => {
    return rows.filter((row) => {
      return columnIds.some((columnId) => {
        const rowValue = row.values[columnId];
        if (rowValue) {
          const formattedDate = new Date(rowValue).toLocaleDateString("en-US");
          return formattedDate.includes(filterValue);
        }
        return false;
      });
    });
  };
    const handleScroll = () => {
        const element = tableRef.current;
        // Check if the scroll position is near the bottom
        if ((element.scrollHeight - element.scrollTop).toFixed(0)-5 < element.clientHeight && hasMore) {
            fetchMoreData();
        }
    };



  
    useEffect(() => {
        const element = tableRef.current;

        if (element) {

            element.addEventListener('scroll', handleScroll);

            return () => {
                element.removeEventListener('scroll', handleScroll);
            };
        }
    }, ); // Add dependencies as needed
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    
  } = useTable(
    {
      columns,
      data: visibleData,
      filterTypes: {
        datetime: filterByDates,
      },
    },
    useGlobalFilter,
    useSortBy
  );

  const scrollToTop = () => {
      const element = tableRef.current
      if (element) {
          element.scrollTo({
              top: 0,
              behavior: "smooth",
          });
      }
  };
  const scrollToBottom = () => {
      const element = tableRef.current
      if (element) {
          element.scrollTo({
              top: element.scrollHeight,
              behavior: "smooth",
          });
      }
  };

  return (
    <>
      
        
          <Header/>
         <div className="flex justify-end p-8">
            <Link href={`/addBook/${language}`}>
              <button className="bg-sky-800 hover:bg-sky-600 text-white px-4 py-2 rounded-md">AddBook</button>
            </Link>
          </div>
            <div className="flex justify-between p-8">
            <div className="w-1/4">
          <div className="flex flex-col gap-4">
          
          <Avatar style={{ width: "150px", height: "150px" }}>
                <AvatarImage src={url} />
                <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
            <p>Name: {profileData.name}</p>
            <p>WebAddress: {profileData.weburl}</p>
            <p>HomeAddress: {profileData.address}</p>
            <p>Contact: {profileData.phone}</p>
            <p>Email: {profileData.email}</p>
            </div>
          </div>
       
        <div className="w-3/4 border-l border-gray-300 pt-8">
            <div ref={tableRef} className=" overflow-x-auto max-h-[65vh]">
              <table
                {...getTableProps()}
                className=" divide-y divide-gray-200 table-striped"
                style={{ maxWidth: "90%"}}
              >
                <thead className={"sticky top-0"}>
                  {headerGroups.map((headerGroup, index) => (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column, index) => (
                        <th
                          key={index}
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          className="px-4 py-2 text-sm sm:text-base "
                        >
                          {column.render("Header")}
                          {column.isSorted && (
                            <span>{column.isSortedDesc ? " ⬇️ " : " ⬆️ "}</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, rowIndex) => {
                    prepareRow(row);
                    return (
                      <tr key={rowIndex} {...row.getRowProps()}  className={rowIndex % 2 === 0 ? "bg-gray-100" : ""}>
                        {row.cells.map((cell, index) => {
                          return (
                            <td
                              key={index}
                              {...cell.getCellProps()}
                              className="px-4 py-2 text-sm sm:text-base "
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
            </div>
            <button
              onClick={scrollToTop}
              className="bg-sky-800 hover:bg-sky-600 text-white py-1 px-1 rounded fixed bottom-20 right-2"
            >
                <BiChevronUp className={"h-5 w-5"}/>

            </button>
              <button
              onClick={scrollToBottom}
              className="bg-sky-800 hover:bg-sky-600 text-white py-1 px-1 rounded fixed bottom-10  right-2"
            >
                <BiChevronDown className={"h-5 w-5"}/>

            </button>

          </div>
          {/* <div className="bottom-0 "><Footer/>
      </div>    */}
        </>
     
  );
};

export default Dashboard;
