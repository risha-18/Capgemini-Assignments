package pack.cap.module9.collection;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Scanner;

public class HashmapAssignment {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		HashMap<Integer, String> products = new HashMap<>();

        products.put(101, "Laptop");
        products.put(102, "Smartphone");
        products.put(103, "Tablet");

        System.out.println("Product List: " + products);
        System.out.println("------------------------------------------------------------------------------");
        int searchId = 102;
        if (products.containsKey(searchId)) {
            System.out.println("Product ID " + searchId + " found: " + products.get(searchId));
        } else {
            System.out.println("Product ID " + searchId + " not found.");
        }

        System.out.println("------------------------------------------------------------------------------");
        
        System.out.println("Iterating over keys to search for product ID...");
        Iterator<Integer> itr = products.keySet().iterator();
        boolean found = false;
        while (itr.hasNext()) {
            int key = itr.next();
            if (key == searchId) {
                System.out.println("Product ID " + searchId + " found via Iterator: " + products.get(key));
                found = true;
                break;
            }
        }
        if (!found) {
            System.out.println("Product ID " + searchId + " not found via Iterator.");
        }

        System.out.println("------------------------------------------------------------------------------");
        
        String searchName = "Tablet";
        if (products.containsValue(searchName)) {
            System.out.println("Product \"" + searchName + "\" is available.");
        } else {
            System.out.println("Product \"" + searchName + "\" is not available.");
        }

        System.out.println("------------------------------------------------------------------------------");
        
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter Product ID to add:");
        int newProductId = scanner.nextInt();
        scanner.nextLine();
        System.out.println("Enter Product Name to add:");
        String newProductName = scanner.nextLine();

        System.out.println("------------------------------------------------------------------------------");
        
        if (products.containsKey(newProductId)) {
            System.out.println("Product ID " + newProductId + " already exists with name: " + products.get(newProductId));
        } else {
            products.put(newProductId, newProductName);
            System.out.println("New Product added: " + newProductId + " -> " + newProductName);
        }
        System.out.println("------------------------------------------------------------------------------");
        
        System.out.println("Updated Product List: " + products);

        scanner.close();
	}

}
