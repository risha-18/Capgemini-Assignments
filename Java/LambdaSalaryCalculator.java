package pack.cap.module7.inter;

@FunctionalInterface
interface SalaryCalculator{
	double calculateSalary(double baseSalary);
	
	/*
	 * String authorwinningPrize(String stmt);
	 */
//	default String authorWinningPrize(String stmt) {
//        return "The author has won the prize for: " + stmt;
//    }
}

@FunctionalInterface
interface AuthorPrize {
    String authorWinningPrize(String stmt);
}

public class LambdaSalaryCalculator {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		double baseSalary = 50000;
		
		SalaryCalculator withBonus = (sal) -> sal+(sal*0.10);
		
		//calculate salary with a deduction of 5%
		 SalaryCalculator withDeduction = (sal) -> sal - (sal * 0.05);
		 
		 // if provide increment
		 SalaryCalculator withIncrement = (sal) ->{
			 if(sal <20000) {
				 return sal+(sal*0.15);}else {
					 return sal;
			 }
		 };
		 
		 SalaryCalculator noChange = (salary) ->salary;
		 System.out.println("Base salary = "+baseSalary);
		 System.out.println("salary without change = "+noChange.calculateSalary(baseSalary));
		 System.out.println("salary with Bonus = "+withBonus.calculateSalary(baseSalary));
		 System.out.println("salary with deduction = "+withDeduction.calculateSalary(baseSalary));
		 System.out.println("salary increment for those whos salary os < 20000 = "+withIncrement.calculateSalary(baseSalary));
		 System.out.println("--------------------------------------------------------------------------------");
		 
		 AuthorPrize prizeMessage = (stmt) -> "The author has won the prize for: " + stmt;
		 
		 String statement = "Outstanding Contribution to Literature";
		 String statement1 = "Outstanding Contribution to Research";
		 String statement2 = "Outstanding Contribution to Fictional-Books";
		 
	     System.out.println(prizeMessage.authorWinningPrize(statement));
	     System.out.println(prizeMessage.authorWinningPrize(statement1));
	     System.out.println(prizeMessage.authorWinningPrize(statement2));
	}

}
