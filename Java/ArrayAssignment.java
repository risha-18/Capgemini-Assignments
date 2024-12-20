package pack.cap.module6.inter;


import java.util.Arrays;

class Employee {
    int id;
    String name;
    double salary;

    public Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }

    @Override
    public String toString() {
        return "\nEmployee{id=" + id + ", name='" + name + "', salary=" + salary + "}\n";
    }


    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Employee employee = (Employee) obj;
        return id == employee.id && Double.compare(employee.salary, salary) == 0 && name.equals(employee.name);
    }
}
public class ArrayAssignment {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Employee[] employees = {
	            new Employee(1, "John", 50000),
	            new Employee(2, "Lily", 60000),
	            new Employee(3, "Charlie", 45000),
	            new Employee(4, "Harry", 70000)
	        };

	        //3. copy
	        Employee[] employeesCopy = Arrays.copyOf(employees, employees.length);
	        
	     // 1. Equality Check
	        System.out.println("Arrays are equal: " + Arrays.equals(employees, employeesCopy));
	        System.out.println("-------------------------------------------------------------------------------------------------------------------");
	        // Create a copy of the array
	        

//	        // Print updated array (copied)
	        
	        System.out.println("Updated Employees (copied): " + Arrays.toString(employeesCopy));
	        System.out.println("-------------------------------------------------------------------------------------------------------------------");
		       
//	        // Print original array (unchanged)
	        System.out.println("Original Employees (unchanged): " + Arrays.toString(employees));
	        System.out.println("-------------------------------------------------------------------------------------------------------------------");
			   
	     // 2. Update salaries by 20%
	        for (int i = 0; i < employeesCopy.length; i++) {
	        	employeesCopy[i].salary += employeesCopy[i].salary*0.20; // Increase salary by 20%
	        }
	        System.out.println("\nEmployees after 20% salary increment: " + Arrays.toString(employeesCopy));
	        System.out.println("------------------------------------------------------------------------------------------------------------------------------------");
		       
	        // 4. Sorting Employees by Salary
	        Arrays.sort(employees, (e1, e2) -> Double.compare(e1.salary, e2.salary));
	        System.out.println("Employees sorted by salary: " + Arrays.toString(employees));
	}

}
