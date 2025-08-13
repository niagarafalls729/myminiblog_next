'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';

function createData(title, date, history) {
  return {
    title,
    date,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

const Row = props => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  return (
    <>
      <tr className={styles.tableRow}>
        <td className={styles.expandCell}>
          <button
            className={styles.expandButton}
            onClick={() => setOpen(!open)}
            aria-label="expand row"
          >
            <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
          </button>
        </td>
        <td className={styles.titleCell}>{row.title}</td>
        <td className={styles.dateCell}>{row.date}</td>
      </tr>
      <tr className={styles.expandRow}>
        <td colSpan={3} className={styles.expandContent}>
          <div className={`${styles.collapse} ${open ? styles.expanded : ''}`}>
            <div className={styles.historyContent}>
              <h6>History</h6>
              {/* {row.history.map((historyRow) => (
                { historyRow }
              ))} */}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

Row.propTypes = {
  row: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', '2023-10-16'),
  createData('Frozen yoghurt', '2023-10-16'),
];

export default function CollapsibleTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table} aria-label="collapsible table">
        <thead>
          <tr>
            <th></th>
            <th>제목</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <Row key={row.name} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
