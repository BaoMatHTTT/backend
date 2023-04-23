interface Personnel {
    PersonID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    Rank: string;
    Salary: number;
    TaxCode: number;
    PersonnelStaffFlag: boolean;
    ProjectStaffFlag: boolean;
    ManagerFlag: boolean;
    CurrentProjectIDs: Array<string>;
    CurrentDepartmentID: string;
}

class Personnel implements Personnel {
    constructor(personnelID: string, firstName: string, lastName: string) {
        
    }
}