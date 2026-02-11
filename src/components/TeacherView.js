import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const TeacherView = () => {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "scores"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudentData(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>老師監控後台</h1>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>學生帳號</th>
            <th>單元 1</th>
            <th>單元 2</th>
            <th>單元 3</th>
            <th>單元 4</th>
            <th>單元 5</th>
            <th>平均分數</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              {/* 顯示各單元分數 */}
              {[1,2,3,4,5].map(unit => (
                <td key={unit}>{student.scores?.[unit] || '-'}</td>
              ))}
              <td>{student.average || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherView;