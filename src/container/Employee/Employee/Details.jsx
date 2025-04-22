import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  CartesianGrid,
} from "recharts";
import request from "../../components/config";
import { useParams } from "react-router-dom";

function Details() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const data1 = {
    absenteeData: [
      { month: "Jan", absences: 2 },
      { month: "Feb", absences: 3 },
      { month: "Mar", absences: 1 },
      { month: "Apr", absences: 4 },
      { month: "May", absences: 2 },
      { month: "Jun", absences: 5 },
      { month: "Jul", absences: 0 },
      { month: "Aug", absences: 6 },
      { month: "Sep", absences: 4 },
      { month: "Oct", absences: 3 },
      { month: "Now", absences: 3 },
      { month: "Dec", absences: 5 },
    ],
    performanceData: [
      { aspect: "Communication", score: 80 },
      { aspect: "Teamwork", score: 90 },
      { aspect: "Technical Skills", score: 85 },
      { aspect: "Problem-Solving", score: 75 },
      { aspect: "Leadership", score: 70 },
      { aspect: "Creativity", score: 65 },
    ],
  };

  const getData = async () => {
    try {
      const res = await request.get(`/user/user/${id}`);
      setData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(id);

  return (
    <div>
      {/* Header */}
      <div className="md:h-20 flex gap-4 md:items-center items-start flex-col md:flex-row justify-between mb-[30px]">
        <h1 className="text-[22px] md:text-3xl font-bold text-textColor">
          Employee Details
        </h1>
      </div>

      {/* Profile Picture & Details */}
      <div className="flex flex-row gap-10 md:gap-40 items-start bg-white w-full p-10 rounded-xl">
        {/* Left Side - Profile Picture */}
        <div>
          <img
            src={data.profile_image}
            alt="Profile Pic"
            className="rounded-full h-24 w-24 md:h-44 md:w-44 object-cover border-8 border-primary"
          />
        </div>

        {/* Right Side - Employee Details */}
        <div className="grid grid-cols-2 text-gray-700 gap-x-10 gap-y-3">
          <p>
            <span className="font-semibold">Full Name:</span>
            {data.last_name} {data.first_name}
          </p>
          <p>
            <span className="font-semibold">Job Title:</span> {data.job_title}
          </p>
          <p>
            <span className="font-semibold">Department:</span> {data.department}
          </p>
          {/* <p>
            <span className="font-semibold">Employee ID:</span> {data.empId}
          </p> */}
          <p>
            <span className="font-semibold">Phone:</span> {data.phone}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {data.email}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {data.address}
          </p>
          <p>
            <span className="font-semibold">Joined Date:</span>{" "}
            {data.joined_date}
          </p>
          <p>
            <span className="font-semibold">Salary:</span> {data.salary}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {data.gender}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span>
            {data.date_of_birth}
          </p>
          <p>
            <span className="font-semibold">Employment Type:</span>
            {data.employment_type}
          </p>
          <p>
            <span className="font-semibold">Emergency Contact:</span>{" "}
            {data.contact}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl p-10 mt-6">
        <div className="">
          <h2 className="text-lg font-semibold mb-2">Absentee Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data1.absenteeData}>
              <CartesianGrid strokeDasharray="0" vertical={true} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="absences"
                stroke="#E11D48"
                strokeWidth={6}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-xl p-10 mt-6">
        <div className="">
          <h2 className="text-lg font-semibold mb-2">Performance Review</h2>
          <ResponsiveContainer width="100%" height={500}>
            <RadarChart data={data1.performanceData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="aspect" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="score"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.5}
                strokeWidth={2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Details;
