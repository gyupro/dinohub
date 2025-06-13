import DinosaurDataService from '@/lib/DinosaurDataService';

async function checkDietValues() {
  const service = new DinosaurDataService();
  
  try {
    console.log('🍽️ Checking diet values in the database...\n');
    
    // Get all dinosaurs without pagination to see all diet values
    const allDinosaurs = await service.getAllDinosaursWithoutPagination();
    
    // Collect unique diet types
    const dietTypes = new Set<string>();
    const dietTypeCount: Record<string, number> = {};
    
    allDinosaurs.forEach((dino: any) => {
      const diet = dino.diet || 'undefined';
      dietTypes.add(diet);
      dietTypeCount[diet] = (dietTypeCount[diet] || 0) + 1;
    });
    
    console.log('📊 Unique diet types found in database:');
    console.log('=' .repeat(50));
    
    // Sort by count
    const sortedTypes = Object.entries(dietTypeCount)
      .sort(([, a], [, b]) => b - a);
    
    sortedTypes.forEach(([type, count]) => {
      console.log(`  "${type}": ${count} dinosaurs`);
    });
    
    console.log('\n🔍 Sample dinosaurs for each diet type:');
    console.log('=' .repeat(50));
    
    // Show examples for each type
    for (const [diet] of sortedTypes.slice(0, 10)) { // Show top 10 types
      const examples = allDinosaurs
        .filter((d: any) => (d.diet || 'undefined') === diet)
        .slice(0, 3)
        .map((d: any) => d.name);
      
      console.log(`\n"${diet}":`);
      examples.forEach((name: string) => console.log(`  - ${name}`));
    }
    
    // Check for specific filter values
    console.log('\n\n🎯 Checking specific filter values:');
    console.log('=' .repeat(50));
    
    const filterValues = ['herbivore', 'carnivore', 'omnivore', 'piscivore'];
    
    for (const filter of filterValues) {
      const exactMatch = allDinosaurs.filter((d: any) => 
        d.diet === filter
      ).length;
      
      const caseInsensitiveMatch = allDinosaurs.filter((d: any) => 
        d.diet?.toLowerCase() === filter.toLowerCase()
      ).length;
      
      const containsMatch = allDinosaurs.filter((d: any) => 
        d.diet?.toLowerCase().includes(filter.toLowerCase())
      ).length;
      
      console.log(`\n"${filter}":`);
      console.log(`  - Exact match: ${exactMatch} dinosaurs`);
      console.log(`  - Case-insensitive match: ${caseInsensitiveMatch} dinosaurs`);
      console.log(`  - Contains match: ${containsMatch} dinosaurs`);
      
      if (containsMatch > 0 && exactMatch === 0) {
        // Show what the actual values are
        const actualValues = allDinosaurs
          .filter((d: any) => d.diet?.toLowerCase().includes(filter.toLowerCase()))
          .map((d: any) => d.diet)
          .filter((v: string, i: number, arr: string[]) => arr.indexOf(v) === i)
          .slice(0, 5);
        
        console.log(`  - Actual values containing "${filter}": ${actualValues.join(', ')}`);
      }
    }
    
    console.log('\n\n✅ Analysis complete!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the check
checkDietValues();