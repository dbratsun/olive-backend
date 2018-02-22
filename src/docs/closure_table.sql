// Query Ancestors of id
select g.* from logicalGroup g 
    join logicalGroup_closure gc 
        on (g.id = gc.ancestor) 
    where gc.descendant = :id

// Query Descendants of id
select g.* from logicalGroup g 
    join logicalGroup_closure gc 
        on (g.id = gc.descendant) 
    where gc.ancestor = :id

// Insert new child of id (name, parentId)
select g.level from logicalGroup g
    where g.id = :id
set lLevel = g.level
insert into logicalGroup(name, parentId, level) output inserted.id 
    values(name, parentId, lLevel)  
set lId = inserted.id    
insert into logicalGroup_closure(ancestor, descendant, level)
    select ancestor, lId, level + 1 
        from logicalGroup_closure
        where descendant = :id
    union all select lId, lId, 1
select max(level) as lLevel from logicalGroup_closure where descendant = :id
update logicalGroup set level = lLevel + 1 where id = lId

// Delete child with id without children 
delete from logicalGroup_closure where descendant = :id
delete from logicalGroup where id = :id

// Delete subtree under :id
delete from logicalGroup_closure
    where descendant in 
        (select descendant from logicalGroup_closure where ancestor = :id)
?? how to delete elements in logicalGroup?



