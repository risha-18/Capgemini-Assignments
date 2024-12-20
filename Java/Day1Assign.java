package pack.cap.module1.basic;

//You are building a system for a retail store that needs to calculate the total price of 
//several items. The items come in different sizes and quantities, so you need to handle 
//various types of numeric data to store item prices, quantities, and the total amount 
//for a transaction. Some numbers (like item price) are small and can fit into a byte or
//short, while others (like total price) might require larger numbers, so they would need
//to be handled by int or long.
//You also need to calculate and display the total price with decimals (e.g., sales tax, discounts),
//which requires floating-point types (float or double).

public class Day1Assign {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		
		
        byte itemCount = 3; 
        short itemQuantity = 10; 
        float itemPrice = 15.50f; 
        float taxRate = 0.05f; 

        
        int totalQuantity = itemCount * itemQuantity; 
        double subtotal = totalQuantity * itemPrice; // Total price before tax
        double tax = subtotal * taxRate; 
        double totalPrice = subtotal + tax; 

       
        System.out.println("Retail Store");
        System.out.println("----------------");
        System.out.printf("Item Count: %d\n", itemCount);
        System.out.printf("Quantity per Item: %d\n", itemQuantity);
        System.out.printf("Price per Item: $%.2f\n", itemPrice);
        System.out.printf("Total Quantity: %d\n", totalQuantity);
        System.out.printf("Subtotal: $%.2f\n", subtotal);
        System.out.printf("Tax (5%%): $%.2f\n", tax);
        System.out.printf("Total Price: $%.2f\n", totalPrice);

	}

}
