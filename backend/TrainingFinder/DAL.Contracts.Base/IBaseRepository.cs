﻿using Domain.Contracts.Base;

namespace DAL.Contracts.Base;

public interface IBaseRepository<TEntity> : IBaseRepository<TEntity, Guid>
    where TEntity : IDomainEntityId
{
}

public interface IBaseRepository<TEntity, TKey>
    where TEntity : IDomainEntityId<TKey>
    where TKey : struct, IEquatable<TKey>
{
    // IEnumerable<TEntity> All();
    Task<IEnumerable<TEntity?>> AllAsync();

    // TEntity Find(TKey id);
    Task<TEntity?> FindAsync(TKey id);

    TEntity Add(TEntity entity);
    // Task AddAsync(TEntity entity);

    TEntity Update(TEntity entity);

    TEntity Remove(TEntity entity);

    Task<TEntity?> RemoveAsyncById(TKey id);
}