/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import MockExam from './pages/MockExam';
import ExamSession from './pages/ExamSession';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="flashcards" element={<Flashcards />} />
          <Route path="mock-exam" element={<MockExam />} />
          <Route path="mock-exam/:part" element={<ExamSession />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
