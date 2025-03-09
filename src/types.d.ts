
interface Department {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

interface Position {
    id: number;
    name: string;
    slug: string;
    description?: string;
    department?: Department;
}

interface Employee {
    id: number;
    name: string;
    email?: string;
    mobileNumber: string;
    nrc: string | NRC;
    dob: string;
    salary: number;
    address: string;
    startDate: string;
    endDate: string
    employmentStatus: string;
    department: Department;
    position: Position,
}

interface NRC {
    nrc_code: string;
    township: string;
    slash: string;
    nrc_type: string;
    nrc_number: number;
}