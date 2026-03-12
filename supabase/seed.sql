-- Optional: run after schema.sql to pre-fill tables with default resume content.
-- Safe to run multiple times: deletes existing rows then inserts (or run only on empty DB).

-- Experiences
insert into public.experiences (title, meta, body, sort_order) values
  ('Development Intern', 'December 2025 – Present · INDMoney · Remote', 'Working on automating the role of a personal finance manager, explaining a financial report to a customer and providing actionable next steps through n8n workflows and AI agents.', 0),
  ('Prefect & Student Council', 'September 2021 – May 2025 · Member of Student Governments @ DIA', 'Initiating school-wide projects and events, raising $2000+ for local non-profits. Policies revision of the student code and ensuring compliance with attendance rules. Conflict resolution & fostering community spirit.', 1),
  ('President & Mentor', 'September 2021 – August 2024 · Matheletes & RAP Program @ DIA', 'Provided student mentorship and support—one-on-one mentorship to struggling students. Organized inter-school and outside school math competitions, coordinating logistics and engaging over 200 participants. Led interactive workshops on combinatorics, calculus, and number theory, engaging 50+ students per session.', 2),
  ('Intern', 'June 2023 · Dubai International Academy', 'Independently designing, conducting, and writing reports on physics, chemistry and biology experiments, enhancing scientific problem-solving skills.', 3);

-- Education
insert into public.education (title, meta, body, sort_order) values
  ('Bachelor of Engineering in Computer Science', 'September 2025 – Present · The Hong Kong University of Science and Technology', 'Rising Freshman.', 0),
  ('Diploma Program & Middle Years Program', 'September 2021 – May 2025 · Dubai International Academy', 'Math AA HL, Physics HL, Chemistry HL, Digital Society HL, English Language and Literature SL, Spanish Ab Initio SL, Computer Science EE, & Theory of Knowledge.', 1);

-- Projects (DB uses cta_href)
insert into public.projects (title, date, subtitle, "desc", img, link, cta, cta_href, sort_order) values
  ('Financial Homomorphic Lattice Encryptor (FHLE)', 'November 2023 – January 2025', null, 'Lattice cryptography (SVP), homomorphic encryption for secure data transmission and computation.', '/images/projects/fhle.avif', 'https://fhle.us/', 'Website', 'https://sharma2007.github.io/FHLE/', 0),
  ('Safe and Secure Concerts (SSC)', 'December 2023 – Feb 2024', 'Location & Vitals Tracking Band', 'Armband with RPi Zero 2W: BLE location tracking, vital signs, relay to central server via SOCKETS, real-time visualization.', '/images/projects/SSC.avif', null, 'Engineering Notebook', 'https://drive.google.com/file/d/1uhaSlFYNLlDF_aEa95Xfuwy7jyIPm3VH/view?usp=sharing', 1),
  ('AI-Reparo', 'December 2022 – March 2023', 'AI for Leading Edge Erosion (LEE)', 'AI-powered drones for detection and repair; Image Binarization + YOLO-v8; Unsaturated Polyester for blade repair.', '/images/projects/AI_Reparo.avif', null, 'Engineering Notebook', 'https://drive.google.com/file/d/1MxfMhiraAbqJw_yqO5KkoPEZ7JrerQm2/view?usp=sharing', 2),
  ('Project Poseidon', 'October 2021 – January 2022', 'Robotic System To Combat Eutrophication', 'Centralized robotic system for testing and treating eutrophicated water to restore natural equilibrium.', '/images/projects/posiden.avif', null, 'Deliverables & Presentation', 'https://drive.google.com/drive/folders/1U9SuEk5wSFR7QIyxNRTSXn-Vcp8W67qo?usp=sharing', 3),
  ('GMailCrypt', 'June 2021', 'Encrypting Emails Locally', 'CLI tool: RSA encryption, image-to-CSV, digital signatures.', '/images/projects/GMailCrypt.avif', null, null, null, 4);

-- Awards
insert into public.awards (title, sub, img, alt, sort_order) values
  ('Fermat Contest', 'Certificate of Distinction (Top 25%) – May 2024', '/images/awards/Fermat.avif', 'Fermat Certificate', 0),
  ('Purple Math Comet', 'UAE No. 1 & Top 5.5% Worldwide – April 2024', '/images/awards/purple_math.avif', 'Purple Math Certificate', 1),
  ('Conrad Innovator', 'Conrad Foundation – February 2024', '/images/awards/Conrad.avif', 'Conrad Certificate', 2),
  ('FLL Abu Dhabi Regional Round', 'Champion''s Runner Up – February 2024', '/images/awards/FLL_AD.avif', 'FLL Abu Dhabi', 3),
  ('National IOI Qualifier', 'UAE Rank 3 – January 2024', '/images/awards/IOIq.avif', 'IOI Qualifier', 4),
  ('Cayley Contest', 'Certificate of Distinction (Top 25%) – May 2023', '/images/awards/Cayley.avif', 'Cayley Certificate', 5),
  ('FLL UAE National Round', 'Core Values Award – March 2023', '/images/awards/FLL_DU_C.avif', 'FLL National', 6),
  ('FLL Dubai Regional Round', 'Champion''s Runner Up – February 2023', '/images/awards/FLL DU.avif', 'FLL Dubai', 7),
  ('Bronze Honor', 'International Youth Math Challenge – December 2022', '/images/awards/IYMC.avif', 'IYMC', 8),
  ('Bebras Challenge', 'National Rank 44 – December 2022', '/images/awards/bebras.avif', 'Bebras', 9);

-- Certifications
insert into public.certifications (title, meta, img, alt, skills, sort_order) values
  ('Learn Intermediate C++ Course', 'Codecademy – July 2025', '/images/certifications/Learn_Intermediate_Cpp_Course.avif', 'Intermediate C++', 'Variable Scope & Storage Classes · Memory Management · Encapsulation · Inheritance · Polymorphism · Abstraction', 0),
  ('Learn C++ Course', 'Codecademy – July 2025', '/images/certifications/Learn_Cpp_Course.avif', 'C++', 'Variables · Conditionals & Logic · Loops · Vectors · Functions', 1),
  ('Learn Python & Ethical Hacking From Scratch', 'zSecurity – July 2023', '/images/certifications/p_h.avif', 'Python & Ethical Hacking', null, 2),
  ('Introduction to Quantum Computing', 'The Coding School – April 2023', '/images/certifications/quantum.avif', 'Quantum Computing', null, 3),
  ('The Complete Java Development Bootcamp', 'Udemy – May 2022', '/images/certifications/java.avif', 'Java Bootcamp', null, 4),
  ('100 Days of Code: Python Pro Bootcamp', 'London App Brewery – April 2022', '/images/certifications/python_100.avif', 'Python 100 Days', null, 5);

-- Camps
insert into public.camps (title, meta, body, img, alt, flip, sort_order) values
  ('DexSchool of Leadership', 'August 2024 – June 2025', 'India''s first school of leadership and entrepreneurship for teenagers. Forbes highlights it as equipping young people to solve 21st-century problems. Chosen from a vast pool of applications for the DexSchool class of 2025.', '/images/camps/DexSchool.avif', 'DexSchool', false, 0),
  ('Proofs Camp', 'Mumbai, India – August 2024', 'The Method of Contradiction; Fermat''s Method of Infinite Descent; Modular Arithmetic; The Principle of Mathematical Induction; The Pigeon Hole Principle; Proof by Contrapositive.', '/images/camps/proofs_camp.avif', 'Proofs Camp', true, 1),
  ('Math.Biz', 'Hyderabad, India – June 2023', 'Bonds, inflation, cashflows, insurance; Agency theory; unconventional assets (NFTs, patents); Elasticity of Demand; Cost Functions, Calculus, Mathematics in Demography; bond valuation, foreign exchange; variance, covariance, correlation.', '/images/camps/math_biz.avif', 'Math.Biz', false, 2),
  ('ISAKx Exploring Leadership', 'Society & Politics – September 2021 – June 2022', 'Analyzed global issues (climate change, social justice, technology). Participated in workshops on emotional intelligence, systems thinking, and creative problem-solving.', '/images/camps/isakx.avif', 'ISAKx', true, 3);

-- Languages
insert into public.languages (name, level, fill, sort_order) values
  ('Hindi', 'Mother Tongue', 100, 0),
  ('English', 'C1', 90, 1),
  ('French', 'A2', 35, 2),
  ('Spanish', 'A2', 35, 3);
