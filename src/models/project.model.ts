interface Project {
    ProjectID: string;
    ManagerID: string;
    Name: string;
    StartDate: Date;
    ExpectedEndDate: Date;
    ActualEndDate: Date | null;
    Description: string;
    Budget: number;
}

class Project implements Project {
    
}