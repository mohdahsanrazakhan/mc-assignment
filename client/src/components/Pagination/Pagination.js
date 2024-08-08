import React, { useState } from 'react';
import { Table, Pagination, Container, Form, Row, Col } from 'react-bootstrap';
import jsonData from '../../data/clients.json';

const ITEMS_PER_PAGE = 10;

function PaginationListData() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  // Filter and search logic
  const filteredData = jsonData.filter(item => {
    const searchMatch =
      item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.includes(searchTerm);
      
    const genderMatch = genderFilter ? item.gender === genderFilter : true;
    const countryMatch = countryFilter ? item.country === countryFilter : true;
    
    return searchMatch && genderMatch && countryMatch;
  });

  // Calculate the starting and ending index of the data to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Total number of pages
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Function to render pagination items
  const renderPaginationItems = () => {
    let items = [];

    if (totalPages <= 5) {
      // If total pages are less than or equal to 5, show all page numbers
      for (let page = 1; page <= totalPages; page++) {
        items.push(
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Pagination.Item>
        );
      }
    } else {
      // If total pages are more than 5, show first, last, and nearby pages with ellipsis
      if (currentPage > 2) {
        items.push(
          <Pagination.Item key={1} onClick={() => setCurrentPage(1)}>
            1
          </Pagination.Item>
        );
        if (currentPage > 3) {
          items.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let page = startPage; page <= endPage; page++) {
        items.push(
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          items.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }
        items.push(
          <Pagination.Item
            key={totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }

    return items;
  };

  return (
    <Container className='mt-3 p-4 border'>
      {/* Search and Filter Inputs */}
      <Form className='mb-3'>
        <Row className='gap-2'>
          <Col md={4}>
            <Form.Control
              type='text'
              placeholder='Search by First Name, Last Name, Email, or Phone'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={genderFilter}
              onChange={e => setGenderFilter(e.target.value)}
            >
              <option value=''>Filter by Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              value={countryFilter}
              onChange={e => setCountryFilter(e.target.value)}
            >
              <option value=''>Filter by Country</option>
              {/* Dynamically generate country options from data */}
              {[...new Set(jsonData.map(item => item.country))].map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Form>

      {/* Paginated Table */}
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id}>
              <td>{startIndex + index + 1}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.gender}</td>
              <td>{item.country}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Controls */}
      <Pagination className='d-flex justify-content-center'>
        <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
        {renderPaginationItems()}
        <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
}

export default PaginationListData;
